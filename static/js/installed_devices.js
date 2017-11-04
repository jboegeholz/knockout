function Device(id, name, functional, info) {
    var self = this;
    self.id = id;
    self.name = name;
    self.functional = functional;
    self.info = info;
}

function DeviceViewModel() {
    let self = this;

    self.installed_devices = ko.observableArray();

    self.editMode = ko.observable(false);


    self.addDevice = function () {
        self.installed_devices.push(new Device(self.findings().length + 1, ""));
    };


    self.editDevices = function () {
        self.editMode(true);
    };


    self.removeDevice = function (device) {
        self.installed_devices.remove(device);

    };

    self.update = function (data) {
        let installed_devices = data.installed_devices;
        for (let index = 0; index < installed_devices.length; ++index) {
            let device = installed_devices[index];
            self.installed_devices.push(new Device(device.id, device.name, device.functional, device.info));
        }

    };

    $.getJSON("/_get_installed_devices", function (data) {
        self.update(data);
    });
}

ko.components.register('installed_devices', {
    template: `<div data-bind="visible: editMode">
    You will see this message only when "shouldShowMessage" holds a true value.
</div>
<table class="table table-striped">
            <thead class="thead-default">
             <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Functional</th>
                  <th>Info</th>
                  <th data-bind="visible: editMode">Remove</th>
                </tr>
              </thead>
            <tbody data-bind="foreach: installed_devices">
            <tr>
            <td><span data-bind="text: id"/></td>
            <td><span data-bind="text: name"/></td>
            <td><label>Yes
   <input type="radio" name="functional" value="true" data-bind="checked:functional"/>
</label> 
<label>No
   <input type="radio" name="functional" value="false" data-bind="checked:functional"/>
</label></td>
            <td><span data-bind="text: info"/></td>
            <td  data-bind="visible: editMode, click: $parent.removeFinding"><i  data-bind="visible: editMode" class="glyphicon glyphicon-trash"></i></td>
            </tr></tbody></table>
            <div class="navbar navbar-inverse">
            <div class="navbar-inner">
            <button class="navbar-btn pull-right" data-bind="click: editDevices">Edit</button>
            </div>
            </div>
            `,

    viewModel: DeviceViewModel

});

$(function () {
    ko.applyBindings();
});
