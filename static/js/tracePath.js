class TracePathViewModel {
    constructor(){
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
        `<div>
            <select data-bind="value: car">
                <option>Fahrer A</option>
                <option>Fahrer B</option>
                <option>Fahrer C</option>
            </select><br/>
            <select data-bind="value: driver">
                <option>Auto A</option>
                <option>Auto B</option>
                <option>Auto C</option>
            </select><br/>
            <input data-bind="value: start_date"/><br/>
            <input data-bind="value: end_date"/><br/>
            <span data-bind="text: trace_path_proposal"></span>\
        </div>`,

    viewModel: {
    createViewModel() {
      return new TracePathViewModel();
    },
  },

});
//ko.applyBindings();