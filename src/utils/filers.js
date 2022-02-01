import Vue from 'vue'

Vue.filter('formatDate', function (value) {
	if (!value) return ''
  value = new Date(value)
  return value.toLocaleDateString('fr-FR')
});