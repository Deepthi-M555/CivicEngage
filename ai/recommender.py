import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
data = pd.read_csv("data/activities.csv")

# Convert text into numbers
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(data['category'])

def recommend_activity(user_interest):
    user_vec = vectorizer.transform([user_interest])
    similarity = cosine_similarity(user_vec, tfidf_matrix)

    scores = similarity.flatten()
    top_indices = scores.argsort()[-3:][::-1]

    return data.iloc[top_indices]['activity'].tolist()