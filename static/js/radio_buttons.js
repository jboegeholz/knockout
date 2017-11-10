function ViewModel() {
    var self = this;
    self.wantsSpam = ko.observable(true);
    self.functional = ko.observable("1") // Initially selects only the Almond radio button

}

ko.components.register('radio_button', {
    template: `<p>Send me spam: <input type="checkbox" data-bind="checked: wantsSpam"/></p>
<div data-bind="visible: wantsSpam">
    Preferred flavor of spam:
    <div><input type="radio" name="flavorGroup" value="1" data-bind="checked: functional"/>Yes</div>
    <div><input type="radio" name="flavorGroup" value="0" data-bind="checked: functional"/>No</div>
</div> `,

    viewModel: ViewModel

});