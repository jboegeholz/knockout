from flask import Flask, render_template, jsonify, json

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


@app.route('/car')
def car():
    return render_template("show_car.html")


@app.route('/_get_installed_devices')
def get_installed_devices():
    installed_devices = [
        {"id": '1', "name": "DVD-C", "functional": json.dumps(True), "info": "Works like a charm"},
        {"id": '2', "name": "HUD", "functional": json.dumps(False), "info": "Works like a slurm"}]

    return jsonify(installed_devices=installed_devices)


@app.route('/_get_available_devices')
def get_available_devices():
    available_devices = [
        {"id": '3', "name": "ACC", "functional": json.dumps(True), "info": "Works like a charm"},
        {"id": '4', "name": "SDIS", "functional": json.dumps(False), "info": "Works like a slurm"}
    ]

    return jsonify(available_devices=available_devices)

if __name__ == '__main__':
    app.run()
