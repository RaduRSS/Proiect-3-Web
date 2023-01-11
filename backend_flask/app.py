from flask import Flask,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS




app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
BLACKLIST = set()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('posts', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id,
        }
    

    def __repr__(self):
        return f'<Post {self.title}>'






@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({'error': 'Missing email or password'}), 400
    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token}), 200


@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({'error': 'Missing email or password'}), 400
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({'error': 'Email already exists'}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Successfully registered'}), 201


@app.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 200

@app.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    title = request.json.get('title', None)
    content = request.json.get('content', None)
    if title is None or content is None:
        return jsonify({'error': 'Missing title or content'}), 400
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    post = Post(title=title, content=content, user=user)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Successfully created post'}), 201



@app.route('/update_email', methods=['PUT'])
@jwt_required()
def update_email_route():
    email = request.json.get('email', None)
    if email is None:
        return jsonify({'error': 'Missing email'}), 400
    user = User.query.filter_by(email=get_jwt_identity()).first()
    user.email = email
    db.session.commit()
    return jsonify({'message': 'Successfully updated email'}), 200


@app.route('/update_password', methods=['PUT'])
@jwt_required()
def update_password_route():
    password = request.json.get('password', None)
    if password is None:
        return jsonify({'error': 'Missing password'}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User.query.filter_by(email=get_jwt_identity()).first()
    user.password = hashed_password
    db.session.commit()
    return jsonify({'message': 'Successfully updated password'}), 200


@app.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post is None:
        return jsonify({'error': 'Post not found'}), 404
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user.is_admin or post.user == user:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted post'}), 200
    else:
        return jsonify({'error': 'Forbidden'}), 403

@app.route("/postsget", methods=["GET"])
@jwt_required()
def get_all_posts():
    posts = Post.query.all()
    post_data = []
    for post in posts:
        post_data.append(post.to_dict())
    return jsonify(post_data)
    
    


if __name__ == '__main__':
    app.run()