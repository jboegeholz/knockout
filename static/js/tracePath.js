class TracePathViewModel {
    constructor() {
        this.car = ko.observable();
        this.driver = ko.observable();
        this.start_date = ko.observable();
        this.end_date = ko.observable();

        this.trace_path_proposal = ko.pureComputed(function () {
            return this.car() + "_" + this.driver();
        }, this);
    }

}

ko.components.register('drive-details', {
    template:
        `<div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Car</span>
            <select class="form-control" data-bind="value: car">
                <option>Fahrer A</option>
                <option>Fahrer B</option>
                <option>Fahrer C</option>
            </select>
            </div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="input-group">
            <span class="input-group-addon">Driver</span>
            <select class="form-control" data-bind="value: driver">
                <option>Auto A</option>
                <option>Auto B</option>
                <option>Auto C</option>
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