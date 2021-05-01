import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.green.base, // #E53935
				secondary: colors.green.lighten4, // #FFCDD2
				accent: colors.yellow.base, // #3F51B5
			},
			dark: {
				primary: colors.green.base, // #E53935
				secondary: colors.green.lighten4, // #FFCDD2
				accent: colors.yellow.base, // #3F51B5
			},
		},
	},
});
