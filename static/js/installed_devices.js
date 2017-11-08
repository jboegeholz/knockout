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


    self.save_installed_devices = function(){
        let jsonData = ko.toJSON(self.installed_devices);
        $.ajax({
            method: "POST",
            url: "/_save_installed_devices",
            data: jsonData
        })
            .done(function (msg) {
                alert("Data Saved: " + msg.success);
            });
    };

    self.editDevices = function () {
        if (self.editMode() === false) {
            self.editMode(true);
            self.editOrSave("Save Devices");
        } else {
            self.save_installed_devices();
            self.editMode(false);
            self.editOrSave("Edit Devices");
        }
    };

    self.addDevice = function () {
        self.selected_available_device();
        ko.utils.arrayForEach(self.available_devices(), function (device) {
            if (device.id === self.selected_available_device()) {
                self.installed_devices.push(device);
                self.available_devices.remove(device);
            }
        });
    };


    self.removeDevice = function (device) {
        self.installed_devices.remove(device);
        self.available_devices.push(new Device(device.id, device.name, device.functional, device.info));
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

    self.remove_installed_devices_from_available = function () {
        ko.utils.arrayForEach(self.installed_devices(), function (device) {
            ko.utils.arrayForEach(self.available_devices(), function (available_device) {
                if (device.id === available_device.id) {
                    self.available_devices.remove(available_device);
                }
            });

        });
    };

    $.getJSON("/_get_installed_devices", function (data) {
        self.update(data);
    });

    $.getJSON("/_get_available_devices", function (data) {
        self.update_available_devices(data);
        self.remove_installed_devices_from_available();
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
            <input type="radio" name="functional_" value="1" data-bind="checked: functional"/>
        </label>
            <label>No
                <input type="radio" name="functional_" value="0" data-bind="checked: functional"/>
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
        visible: editMode  
    ">

    </select>
    <button data-bind="visible: editMode, click: addDevice">Add</button>
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
