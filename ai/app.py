from flask import Flask, request, jsonify
from recommender import recommend_activity

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    interest = request.json['interest']
    result = recommend_activity(interest)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001)