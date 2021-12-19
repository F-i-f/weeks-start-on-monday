// weeks-start-on-monday - Gnome shell extension for changing the week start day
// Copyright (C) 2019-2021 Philippe Troin (F-i-f on Github)
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

const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Gettext = imports.gettext.domain(Me.metadata['gettext-domain']);
const _ = Gettext.gettext;

const WeeksStartOnMondaySettings = GObject.registerClass(class WeeksStartOnMondaySettings extends Gtk.Grid {

    setup() {
	this.margin_top = 12;
	this.margin_bottom = this.margin_top;
	this.margin_start = 48;
	this.margin_end = this.margin_start;
	this.row_spacing = 6;
	this.column_spacing = this.row_spacing;
	this.orientation = Gtk.Orientation.VERTICAL;

	this._settings = ExtensionUtils.getSettings();

	let ypos = 1;
	let descr;

	this.title_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="large" weight="heavy">'
		+_('Weeks Start on Monday Again...')+'</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER
	});
	this.attach(this.title_label, 1, ypos, 2, 1);

	ypos += 1;

	this.version_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="small">'+_('Version')
		+ ' ' + Me.metadata['version']+' / git '+Me.metadata['vcs_revision'] + '</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER,
	});
	this.attach(this.version_label, 1, ypos, 2, 1);

	ypos += 1;

	this.link_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="small"><a href="'+Me.metadata.url+'">'
		+ Me.metadata.url + '</a></span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER,
	    margin_bottom: this.margin_bottom
	});
	this.attach(this.link_label, 1, ypos, 2, 1);

	ypos += 1;

	descr = _(this._settings.settings_schema.get_key('start-day').get_description());
	this.starton_label = new Gtk.Label({label: _("Weeks start on:")});
	this.starton_label.set_tooltip_text(descr);
	this.starton_adjustment = new Gtk.Adjustment({ lower          : 0,
						       upper          : 6,
						       step_increment : 1
					      })
	this.starton_control = new Gtk.Scale({orientation: Gtk.Orientation.HORIZONTAL,
					      draw_value: false,
					      margin_start: 5,
					      margin_end: 5,
					      margin_top: 5,
					      margin_bottom: 5,
					      digits: 0,
					      adjustment: this.starton_adjustment
					     });
	this.starton_control.set_tooltip_text(descr);
	this.starton_control.set_round_digits(0);
	[ _('Sunday'), _('Monday'), _('Tuesday'), _('Wednesday'),
	  _('Thursday'), _('Friday'), _('Saturday')
	].forEach((function(day, idx) {
	    this.starton_control.add_mark(idx, Gtk.PositionType.BOTTOM, day);
	}).bind(this));
	let css = new Gtk.CssProvider();
	css.load_from_data('label { min-width: 12ex; } trough { margin-right: 10ex; }');
	this.starton_control.get_style_context().add_provider(css, Gtk.StyleProvider.PRIORITY_APPLICATION);
	this.attach(this.starton_label,   1, ypos, 1, 1);
	this.attach(this.starton_control, 2, ypos, 1, 1);
	this._settings.bind('start-day', this.starton_adjustment, 'value', Gio.SettingsBindFlags.DEFAULT);

	ypos += 1;

	this.copyright_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="small">'
		+ _('Copyright © 2019-2021 Philippe Troin (<a href="https://github.com/F-i-f">F-i-f</a> on GitHub)')
		+ '</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER,
	    margin_top: this.margin_bottom
	});
	this.attach(this.copyright_label, 1, ypos, 2, 1);

	ypos += 1;
    }
});

function init() {
    ExtensionUtils.initTranslations();
}

function buildPrefsWidget() {
    let widget = new WeeksStartOnMondaySettings();
    widget.setup();
    // show_all() is only available/necessary on GTK < 4.0.
    if (widget.show_all !== undefined) {
	widget.show_all();
    }

    return widget;
}
