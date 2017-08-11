from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/_get_findings')
def get_findings():
    findings = [{"id": '1', "trigger": "123"},
                {"id": '2', "trigger": "234"},
                {"id": '3', "trigger": "345"}]

    return jsonify(findings=findings)


if __name__ == '__main__':
    app.run()
