const DateMenu = imports.ui.main.panel.statusArea.dateMenu;
const Shell    = imports.gi.Shell;
const Me       = imports.misc.extensionUtils.getCurrentExtension();

const Prefs = Me.imports.prefs;

let undos = [];

function init() {
    Prefs.init();
}

function enable() {
    function set() {
        DateMenu._eventList._weekStart = Prefs.getStartDay();
        DateMenu._calendar._weekStart = Prefs.getStartDay();
        DateMenu._calendar._onSettingsChange();
    }

    function unset() {
        DateMenu._eventList._weekStart = Shell.util_get_week_start();
        DateMenu._calendar._weekStart = Shell.util_get_week_start();
        DateMenu._calendar._onSettingsChange();
    }

    set();

    undos.push(
        unset,
        Prefs.onStartDayChange(set)
    );
}

function disable() {
    while(undos.length > 0) {
        undos.pop()();
    }
}
