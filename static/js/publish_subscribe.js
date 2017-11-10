function Container1ViewModel() {
    let self = this;
    self.car = ko.observable("").publishOn("car");
    self.init = function () {
        let the_car = $('#car').text();
        self.car(the_car);
    };
    self.init();

}

function Container2ViewModel() {
    let self = this;
    self.car = ko.observable().subscribeTo("car", true);


}


ko.components.register('component_1', {
    template: `<div id="container1">
    <h2>Component 1</h2>
    <input data-bind="value: car"/>
</div>`,

    viewModel: Container1ViewModel

});

ko.components.register('component_2', {
    template: `<div id="container2">
    <h2>Component 2</h2>
    <span data-bind="text: car"></span>
</div>`,

    viewModel: Container2ViewModel

});