import Vue from 'vue'

Vue.filter('formatDate', function (value) {
	if (!value) return ''
  value = new Date(value)
  return value.toLocaleDateString('fr-FR')
});

Vue.filter('sendBy', function (value) {
  if (value == 0)
    return 'them';
  return 'you';
});

Vue.filter('isByMe', function (value) {
  return !value || false;
});