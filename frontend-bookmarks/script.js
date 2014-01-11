$(function(){

	var Service = Backbone.Model.extend({
		toggle: function(){
			this.set('checked', !this.get('checked'));
		}
	});

	var ServiceList = Backbone.Collection.extend({
		model: Service,
		comparator: function(collection){
			return (collection.get('title'))
		},
		getChecked: function(){
			return this.where({checked:true});
		}
	});

	var ServiceView = Backbone.View.extend({
		tagName: 'li',

		events:{
			'click': 'toggleService'
		},

		initialize: function(){
			// _(this.model).sortBy(this.model.title);
			// this.services.sort();
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){
			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title')) ;
			this.$('input').prop('checked', this.model.get('checked'));
			return this;
		},

		toggleService: function(){
			this.model.toggle();
		}
	});

	var App = Backbone.View.extend({
		el: $('#result'),

		initialize: function(){
			this.list = $('#services');
			this.listenTo(services, 'change', this.render);
			services.each(function(service){
				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);
			}, this);	
		},

		render: function(){
			var results = ""
			_.each(services.getChecked(), function(elem){
				var lists = _.map(elem.get('sources'), function(source){
					var link = source.replace(/.*\(/, '').replace(/\).*/, '');
					var title = source.replace(/\].*/, '').replace(/\[/, '');
					var text = source.replace(/.*\)/, '');
					return '<li><a href="' + link + '" target="_blank">' + title + text + '</a></li>'
				});
				results += elem.get('title') + lists.join('') + "</br>";
			});
			this.$el.html(results);
			return this;
		}
	});

	 var services;

	$.get("/frontend-bookmarks/data.md.txt").done(function(data){
	 	var lines = data.split("\n"),
	 			currentService,
	 			unsortedServices = [],
	 			i;
	 	for (i = 0; i < lines.length; i += 1) {
	 		if (lines[i].match(/^\S/)) {
				currentService = {title: lines[i].replace('+', ''), sources: []};
	 		} 
	 		else {
	 			currentService.sources.push(lines[i].replace('    +', ''))
	 			if (lines[i+1] && lines[i+1].match(/^\S/)) {
	 				unsortedServices.push(new Service(currentService));
	 			};
	 		}
	 	}
	 	services = new ServiceList(_.sortBy(unsortedServices, function(service) {
	 		return service.title;
	 	}));
	 	new App();
	});

});