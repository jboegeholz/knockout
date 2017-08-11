function FindingViewModel() {
    var self = this;

    self.findings = ko.observableArray([
        {id: '1', trigger: "123"},
        {id: '2', trigger: "234"},
        {id: '3', trigger: "345"}
    ]);

    self.addFinding = function () {
        console.log(self.findings().length);
        self.findings.push({id: (self.findings().length + 1), trigger: ""});
    };
    self.removeFinding = function() {
        self.findings.remove(this);
        self.findings().foreach(function(entry){
            console.log(entry.id)
        })
    }

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
            <button data-bind="click: addFinding">Add a Finding</button>`,

    viewModel: {
        createViewModel() {
            return new FindingViewModel();
        },
    },

});
ko.applyBindings(new FindingViewModel());