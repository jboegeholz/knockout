function FindingViewModel() {
    let self = this;

    self.findings = ko.observableArray();

    self.addFinding = function () {
        console.log(self.findings().length);
        self.findings.push({id: (self.findings().length + 1), trigger: ""});
    };
    self.removeFinding = function () {
        self.findings.remove(this);
        self.findings().foreach(function (entry) {
            console.log(entry.id)
        })
    };
    self.update = function () {
        $.getJSON("/_get_findings", function (data) {
            this.findings = data;
        })
    };

}


ko.components.register('finding', {
    template: `<table>
            <tbody data-bind="foreach: findings">
            <tr>
            <td><input data-bind="value: id"/></td>
            <td><input data-bind="value: trigger"/></td>
            <td><input /></td>
            <td><input /></td>
            <td><a href="#" data-bind="click: $parent.removeFinding">Remove</a></td>
            </tr></tbody></table>
            <button data-bind="click: addFinding">Add a Finding</button>
            <button data-bind="click: update">Sync</button>`,

    viewModel: {
        createViewModel() {
            return new FindingViewModel();
        },
    },

});
ko.applyBindings(new FindingViewModel());