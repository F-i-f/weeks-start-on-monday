// weeks-start-on-monday - Gnome shell extension for changing the week start day
// Copyright (C) 2019, 2021 Philippe Troin (F-i-f on Github)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const Shell	     = imports.gi.Shell;
const DateMenu	     = imports.ui.main.panel.statusArea.dateMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me             = ExtensionUtils.getCurrentExtension();

const WeeksStartOnMondayExtension = class WeeksStartOnMondayExtension {
    constructor() {
	this._settings = null;
	this._startDayChangedConnection = null;
    }

    _on_start_day_changed() {
	DateMenu._calendar._weekStart = this._settings.get_int('start-day');
	DateMenu._calendar._onSettingsChange();
    }

    enable() {
	this._settings = ExtensionUtils.getSettings();
	this._startDayChangedConnection = this._settings.connect('changed::start-day',
								 this._on_start_day_changed.bind(this));
	this._on_start_day_changed();
    }

    disable() {
	this._settings.disconnect(this._startDayChangedConnection);
	this._startDayChangedConnection = null;
	this._settings = null;

	DateMenu._calendar._weekStart = Shell.util_get_week_start();
	DateMenu._calendar._onSettingsChange();
    }
};

function init() {
    return new WeeksStartOnMondayExtension();
}
