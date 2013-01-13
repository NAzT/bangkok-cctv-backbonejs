window.CctvItem = Backbone.Model.extend({});
window.CctvView = Backbone.View.extend({
    className: 'cctv-wrapper',
    tagName: 'li',
    events: {
        'click img': 'onClick'
    },
    onClick: function() {
        console.log("CLICKED");
    },
    template:_.template(' <img alt="<%= name_th %>" src="http://www.together.in.th/drupal/traffy/generate/cctvimg/<%= id %>.png" class="cctv-image"> \
                              <div class="cctv-info"> \
                                  <span class="cctv-name"><%= name_th %></span>\
                                  <span class="cctv-lastupdate" style="margin-left: 10px;"><%= lastupdate %></span>\
                              </div>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})

window.CctvList = Backbone.Collection.extend({
    url: '/cctvs',
    model: CctvItem
})

window.CctvListView = Backbone.View.extend({
    initialize: function() {
        this.on('add', this.addOneRecord, this);
        this.collection.on('reset', this.render, this);
    },
    render: function() {
        this.collection.forEach(this.addOneRecord, this);
    },
    addOneRecord: function(cctvItem) {
        var cctvView = new CctvView({model: cctvItem});
        this.$el.append(cctvView.render().el)
        return this;
    }
});

jQuery(function($){
    var CctvApp = new (Backbone.Router.extend({
        routes: { "": "index", "show/:id": "show" },
        initialize: function() {
            this.cctvList = new CctvList();
            this.cctvsView = new CctvListView({ collection: this.cctvList });
            $('body').append(this.cctvsView.el)
        },
        start: function() {
            Backbone.history.start({pushState: true});
        },
        index: function() {
            console.log("FETCHING");
            this.cctvList.fetch();
        },
        show: function(id){ }
    }));
    CctvApp.start();
})
