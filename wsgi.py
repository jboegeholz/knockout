from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("report.html")


@app.route('/_get_findings')
def get_findings():
    findings = [{"id": '1', "trigger": "123"},
                {"id": '2', "trigger": "234"},
                {"id": '3', "trigger": "345"}]

    return jsonify(findings=findings)


@app.route('/_get_available_cars')
def get_available_cars():
    cars = ["Car_A", "Car_B", "Car_C"]

    return jsonify(cars=cars)

if __name__ == '__main__':
    app.run()
