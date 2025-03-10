from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    # In the future, handle the coffee/water calculations here
    # For now, return a placeholder
    data = request.json
    # e.g. coffee_amount = data["coffee_amount"]
    # do your calculation
    return jsonify({"message": "Calculation goes here."})

if __name__ == "__main__":
    app.run(debug=True)