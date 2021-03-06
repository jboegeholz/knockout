class TracePathViewModel {
    constructor() {
        var self = this;
        this.car = ko.observable();
        this.availableCars = ko.observableArray();
        this.driver = ko.observable();
        this.availableDriver = ko.observableArray(["Driver_A", "Driver_B"]);
        this.start_date = ko.observable("01.01.2017");
        this.end_date = ko.observable("02.01.2017");

        this.trace_path_proposal = ko.pureComputed(function () {
            return this.car() + "_" + this.driver() + "_" + this.start_date() + "_" + this.end_date();
        }, this);

        $.getJSON("/_get_available_cars", function (data) {
            self.update(data);
        });
    }

    update(data) {
        let cars = data.cars;
        for (let index = 0; index < cars.length; ++index) {
            let car = cars[index];
            this.availableCars.push(car);
        }

    };

}
//https://stackoverflow.com/questions/13629910/jquery-ui-datepicker-with-knockout-js
ko.components.register('drive-details', {
    template:
        `<div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Car</span>
            <select class="form-control" data-bind="options: availableCars, value: car">
            </select>
            </div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Driver</span>
            <select class="form-control" data-bind="options: availableDriver, value: driver">
            </select></div></div></div>
                        <div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Start Date</span>
            <input class="form-control" data-bind="value: start_date"/>
            </div></div></div>
            <div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">End Date</span>
            <input class="form-control" data-bind="value: end_date"/>       
            </div></div></div>                 
            <div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Trace Path Proposal</span>
            <input class="form-control" data-bind="value: trace_path_proposal" />
            </div>
        </div>
        </div>`,

    viewModel: {
        createViewModel() {
            return new TracePathViewModel();
        },
    },

});
//ko.applyBindings();