jQuery(document).ready(function($){
    window.CctvItem = Backbone.Model.extend({});
    window.CctvView = Backbone.View.extend({
        className: 'cctv-wrapper',
        tagName: 'li',
        template:_.template(' <img alt="<%= name_th %>" src="http://www.together.in.th/drupal/traffy/generate/cctvimg/<%= id %>.png" class="cctv-image"> \
                      <div class="cctv-info"> \
                          <span class="cctv-name"><%= name_th %></span>\
                          <span class="cctv-lastupdate" style="margin-left: 10px;"><%= lastupdate %></span>\
                      </div>'),
        render: function() {
            console.log(this.collection)
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

    window.CctvList = Backbone.Collection.extend({
        url: '/cctvs',
        model: CctvItem
    })

    window.cctvList = new CctvList()

    window.CctvListView = Backbone.View.extend({
        initialize: function() {
            this.on('add', this.addOneRecord, this);
            this.on('reset', this.render, this);
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

    window.cctvListView = new CctvListView({collection: cctvList})

    $('body').append(cctvListView.el)
    cctvList.fetch({ success: function() { cctvListView.render(); }})
});

