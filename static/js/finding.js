function FindingViewModel() {
    let self = this;

    self.findings = ko.observableArray();

    self.addFinding = function () {
        //console.log(self.findings().length);
        self.findings.push(new Finding(self.findings().length + 1, ""));
    };
    self.removeFinding = function () {
        self.findings.remove(this);
        ko.utils.arrayForEach(self.findings(), function(value, i){
            self.findings.replace(value, new Finding(i+1, value.trigger()));
        });
    };
    self.update = function () {
        $.getJSON("/_get_findings", function (data) {
            self.findings(data.findings);
        })
    };

}

function Finding(id, trigger){
    var self = this;
    self.id = ko.observable(id);
    self.trigger = ko.observable(trigger);
}

ko.components.register('finding', {
    template: `<table>
            <tbody data-bind="foreach: findings">
            <tr>
            <td><span data-bind="text: id"/></td>
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