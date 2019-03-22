const Gio  = imports.gi.Gio;
const Gtk  = imports.gi.Gtk;
const Lang = imports.lang;
const Me   = imports.misc.extensionUtils.getCurrentExtension();

let settings = {};

function init() {
    const GioSSS = Gio.SettingsSchemaSource;

    let schema = Me.metadata['settings-schema'];
    let source = GioSSS.new_from_directory(Me.dir.get_child('schemas').get_path(),
                                           GioSSS.get_default(),
                                           false);

    settings = new Gio.Settings({
        settings_schema : source.lookup(schema, true)
    });

    let set_int = Lang.bind(settings, settings.set_int);
    settings.set_int = function(key, value) {
        set_int(key, value);
        Gio.Settings.sync();
    };
}

function getStartDay() {
    let day = settings.get_int('start-day') % 7;
    return day < 0 ? -day : day;
}

function setStartDay(day) {
    settings.set_int('start-day', day);
}


function onStartDayChange(callback) {
    let hook = settings.connect('changed::start-day', callback);
    return function() {
        settings.disconnect(hook);
    };
}

function buildPrefsWidget() {
    let scale = new Gtk.Scale({
        orientation : Gtk.Orientation.HORIZONTAL,
        draw_value  : false,
        margin      : 5,
        digits      : 0,
        adjustment  : new Gtk.Adjustment({
            value          : getStartDay(),
            lower          : 0,
            upper          : 6,
            step_increment : 1
        })
    });
    scale.set_round_digits(0);

    let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

    days.forEach(function(day, i, a) {
        scale.add_mark(i, Gtk.PositionType.BOTTOM, day);
    });

    scale.connect('value-changed', function() {
        setStartDay(scale.get_value());
    });

    scale.show_all();
    return scale;
}
