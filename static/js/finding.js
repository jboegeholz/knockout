function Finding(id, trigger) {
    var self = this;
    self.id = ko.observable(id);
    self.trigger = ko.observable(trigger);
}

function FindingViewModel() {
    let self = this;

    self.findings = ko.observableArray();


    self.addFinding = function () {
        self.findings.push(new Finding(self.findings().length + 1, ""));
    };

    self.removeFinding = function (finding) {
        self.findings.remove(finding);
        ko.utils.arrayForEach(self.findings(), function (value, i) {
            self.findings.replace(value, new Finding(i + 1, value.trigger()));
        });
    };

    self.update = function (data) {
        let findings = data.findings;
        for (let index = 0; index < findings.length; ++index) {
            let finding = findings[index];
            self.findings.push(new Finding(self.findings().length + 1, finding.trigger));
        }

    };

    $.getJSON("/_get_findings", function (data) {
        self.update(data);
    });
}

ko.components.register('finding', {
    template: `<table class="table table-striped">
            <thead class="thead-default">
             <tr>
                  <th>#</th>
                  <th>Trigger</th>
                  <th>Action</th>
                  <th>Result</th>
                </tr>
              </thead>
            <tbody data-bind="foreach: findings">
            <tr>
            <td><span data-bind="text: id"/></td>
            <td><input data-bind="value: trigger"/></td>
            <td><input /></td>
            <td><input /></td>
            <td><a href="#" data-bind="click: $parent.removeFinding">Remove</a></td>
            </tr></tbody></table>
            <button data-bind="click: addFinding">Add a Finding</button>`,

    viewModel: FindingViewModel

});

$(function () {
    ko.applyBindings();
});
