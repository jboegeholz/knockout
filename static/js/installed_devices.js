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

    self.available_devices = ko.observableArray();

    self.selected_available_device = ko.observable();

    self.editMode = ko.observable(false);

    self.editOrSave = ko.observable("Edit Devices");

    self.addDevice = function () {
        alert(self.selected_available_device());
        self.installed_devices.push(self.available_devices()[self.selected_available_device()]);
        //self.available_devices.remove(self.available_devices()[self.selected_available_device() - 1])
    };

    self.find = function(id)
    {
        let found = ko.utils.arrayFirst(self.installed_devices(), function(device) {
            return device.id === id;
        });
        return found;
    };

    self.editDevices = function () {
        if (self.editMode() === false) {
            self.editMode(true);
            self.editOrSave("Save Devices");
        } else {
            self.editMode(false);
            self.editOrSave("Edit Devices");
        }
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

    self.update_available_devices = function (data) {
        let available_devices = data.available_devices;
        for (let index = 0; index < available_devices.length; ++index) {
            let device = available_devices[index];
            self.available_devices.push(new Device(device.id, device.name, device.functional, device.info));
        }

    };

    $.getJSON("/_get_installed_devices", function (data) {
        self.update(data);
    });

    $.getJSON("/_get_available_devices", function (data) {
        self.update_available_devices(data);
    });
}

ko.components.register('installed_devices', {
    template: `<table class="table table-striped">
    <thead class="thead-default">
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Functional</th>
        <th>Info</th>
        <th data-bind="visible: editMode()">Remove</th>
    </tr>
    </thead>
    <tbody data-bind="foreach: installed_devices">
    <tr>
        <td><span data-bind="text: id"/></td>
        <td><span data-bind="text: name"/></td>
        <td><label>Yes
            <input type="radio" name="functional" value="true" data-bind="checked: functional"/>
        </label>
            <label>No
                <input type="radio" name="functional" value="false" data-bind="checked: !functional"/>
            </label></td>
        <td>
            <input type="text" data-bind="value:info, visible: $parent.editMode()"/>
            <span data-bind="text:info, visible: !$parent.editMode()">
        </td>
        <td data-bind="visible: $parent.editMode, click: $parent.removeDevice"><i class="glyphicon glyphicon-trash"></i>
        </td>
    </tr>
    </tbody>
</table>
<div class="navbar navbar-inverse">

    <select data-bind=" 
        value: selected_available_device,
        options:        available_devices,
        optionsText:    'name', 
        optionsValue:   'id',   
        optionsCaption: '-- Select Device --'
    ">

    </select>
    <button data-bind="click: addDevice">Add</button>
    <div class="navbar-inner">
        <button class="navbar-btn pull-right" data-bind="text: editOrSave, click: editDevices"></button>
    </div>
</div>
            `,

    viewModel: DeviceViewModel

});

$(function () {
    ko.applyBindings();
});
