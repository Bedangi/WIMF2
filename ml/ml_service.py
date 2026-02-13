from flask import Flask, request, jsonify
from model_utils import recommend_recipe_precise, get_recipe_steps

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    ingredients = data.get("ingredients", "").strip()

    recommendations = recommend_recipe_precise(ingredients)

    if recommendations.empty:
        return jsonify([])

    return jsonify(recommendations.to_dict(orient="records"))


@app.route("/recipe/<name>", methods=["GET"])
def recipe(name):
    recipe = get_recipe_steps(name)

    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    return jsonify(recipe)


if __name__ == "__main__":
    app.run(port=5001, debug=True)
