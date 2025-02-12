// -*- indent-tabs-mode: nil; -*-
// weeks-start-on-monday - Gnome shell extension for changing the week start day
// Copyright (C) 2019-2025 Philippe Troin (F-i-f on Github)
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

import {
    ExtensionPreferences,
    gettext as _,
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

export default class WeeksStartOnMondaySettings extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const grid = new Gtk.Grid();
        grid.margin_top = 12;
        grid.margin_bottom = grid.margin_top;
        grid.margin_start = 48;
        grid.margin_end = grid.margin_start;
        grid.row_spacing = 6;
        grid.column_spacing = grid.row_spacing;
        grid.orientation = Gtk.Orientation.VERTICAL;

        const settings = this.getSettings();

        let ypos = 1;

        const title_label = new Gtk.Label({
            use_markup: true,
            label:
                '<span size="large" weight="heavy">' +
                _('Weeks Start on Monday Again...') +
                '</span>',
            hexpand: true,
            halign: Gtk.Align.CENTER,
        });
        grid.attach(title_label, 1, ypos, 2, 1);

        ypos += 1;

        const version_label = new Gtk.Label({
            use_markup: true,
            label:
                '<span size="small">' +
                _('Version') +
                ' ' +
                this.metadata['version'] +
                ' / git ' +
                this.metadata['vcs_revision'] +
                '</span>',
            hexpand: true,
            halign: Gtk.Align.CENTER,
        });
        grid.attach(version_label, 1, ypos, 2, 1);

        ypos += 1;

        const link_label = new Gtk.Label({
            use_markup: true,
            label:
                '<span size="small"><a href="' +
                this.metadata.url +
                '">' +
                this.metadata.url +
                '</a></span>',
            hexpand: true,
            halign: Gtk.Align.CENTER,
            margin_bottom: grid.margin_bottom,
        });
        grid.attach(link_label, 1, ypos, 2, 1);

        ypos += 1;

        const starton_descr = _(
            settings.settings_schema.get_key('start-day').get_description()
        );
        const starton_label = new Gtk.Label({label: _('Weeks start on:')});
        starton_label.set_tooltip_text(starton_descr);
        const starton_adjustment = new Gtk.Adjustment({
            lower: 0,
            upper: 6,
            step_increment: 1,
        });
        const starton_control = new Gtk.Scale({
            orientation: Gtk.Orientation.VERTICAL,
            draw_value: false,
            margin_start: 5,
            margin_end: 5,
            margin_top: 5,
            margin_bottom: 5,
            digits: 0,
            adjustment: starton_adjustment,
        });
        starton_control.set_tooltip_text(starton_descr);
        starton_control.set_round_digits(0);
        [
            _('Sunday'),
            _('Monday'),
            _('Tuesday'),
            _('Wednesday'),
            _('Thursday'),
            _('Friday'),
            _('Saturday'),
        ].forEach((day, idx) => {
            starton_control.add_mark(idx, Gtk.PositionType.BOTTOM, day);
        });
        grid.attach(starton_label, 1, ypos, 1, 1);
        grid.attach(starton_control, 2, ypos, 1, 1);
        settings.bind(
            'start-day',
            starton_adjustment,
            'value',
            Gio.SettingsBindFlags.DEFAULT
        );

        ypos += 1;

        const copyright_label = new Gtk.Label({
            use_markup: true,
            label:
                '<span size="small">' +
                _(
                    'Copyright © 2019-2025 Philippe Troin (<a href="https://github.com/F-i-f">F-i-f</a> on GitHub)'
                ) +
                '</span>',
            hexpand: true,
            halign: Gtk.Align.CENTER,
            margin_top: grid.margin_top,
        });
        grid.attach(copyright_label, 1, ypos, 2, 1);

        ypos += 1;

        const group = new Adw.PreferencesGroup();
        group.add(grid);
        const page = new Adw.PreferencesPage();
        page.add(group);

        window.add(page);
    }
}
