kb_define('kbaseMethodDescription',
    [
        'jquery',
    	'kbwidget',
    	'narrativeMethodStore',
    	'kbaseAccordion',
    	'kbaseLineSerieschart',
    ],
    function ($) {

    $.KBWidget({
        name: "kbaseMethodDescription",
        parent: "kbaseWidget",
        version: "1.0.0",
        options: {
            color: "black",
            narrativeMethodStoreURL : "https://kbase.us/services/narrative_method_store/rpc",
        },

        init: function(options) {
            this._super(options);

            this.nms = new NarrativeMethodStore(this.options.narrativeMethodStoreURL);

            if (this.options.spec == undefined) {
                this.details_from_id('align_protein_sequences_generic');
            }
            else {
                this.details(this.options.spec);
            }

            this.$elem.append('App Description');

            return this;
        },

        details_from_id : function(id) {
            var $details = this;

            this.nms.get_method_full_info({ids : [id]}, function (data) {
                $details.options.spec = data[0];
                console.log(data);
                $details.details($details.options.spec);
            });
        },

        details : function(spec) {
            var $details = this;

            var steps = [];
console.log(spec);
            $.each(
                spec.steps,
                function (idx, step) {
                    steps.push(
                        {
                            caption : step.description,
                        }
                    );
                }
            );

            var $carouselDiv = $.jqElem('div');
            $carouselDiv.kbaseCarousel(
                {
                    carousel : steps
                }
            );

            this.$elem.empty();

            this.$elem.append(
                $.jqElem('h1').append('Description')
            );

            this.$elem.append(
                $.jqElem('div').append(spec.info.header)
            );

            this.$elem.append($carouselDiv);

            this.$elem.append(
                $.jqElem('h1').append('Documentation')
            );

            this.$elem.append(
                $.jqElem('div').append(spec.info.subtitle)
            );

        },

        old_details : function (m) {

            m = {id : m};

            var $details = this;

            this.nms.get_method_full_info({ids:[m.id]}, function(data) {

            $details.nms.get_method_spec({ids:[m.id]}, function (spec) {
console.log("DETAILED SPEC IS ", spec);
            var meth = data[0];

            var $res =
                $.jqElem('div');

            var $gal = $.jqElem('div');


            if (meth.screenshots == undefined || meth.screenshots.length == 0) {
                meth.screenshots = [];
            }

            $.each(
                meth.screenshots,
                function (idx, ss) {

                    if (ss.thumb == undefined || ! ss.thumb.match(/^http/)) {
                        ss.thumb = 'https://kbase.us/services/narrative_method_store' + (ss.thumb || ss.url);
                    }

                    if (! ss.url.match(/^http/)) {
                        ss.url = 'https://kbase.us/services/narrative_method_store' + ss.url;
                    }



                    $gal
                        .append(
                            $.jqElem('img')
                                .attr('src', ss.thumb)
                                .css({width : '128px', height : '128px', margin : '2px'})
                                .on('click', function(e) {
                                    window.open( ss.url);
                                    return;
                                })
                        )

                }
            );


            $res
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-8')
                                    .append($.jqElem('h1').append(meth.name))
                            )
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-2')
                                    .append(
                                        $.jqElem('button')
                                            .addClass('btn btn-primary')
                                            .on('click', function(e) {
                                                if ($details.options.sidePanel) {
                                                    $details.options.sidePanel.toggleOverlay();
                                                }
                                                $details.trigger('methodClicked.Narrative', spec[0]);
                                            })
                                            .append('Add to narrative')

                                    )
                            )
                    )
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-12')
                                    .append($.jqElem('h2').append(meth.subtitle))
                            )
                    )
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-4')
                                    .css({'font-weight' : 'bold'})
                                    .append('Version')
                            )
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-8')
                                    .append(meth.ver)
                            )
                    )
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-4')
                                    .css({'font-weight' : 'bold'})
                                    .append('Help or questions? Contact:')
                            )
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-8')
                                    .append(meth.contact)
                            )
                    )
                    .append($.jqElem('hr'))
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-12')
                                    .append($.jqElem('h4').append('Technical Details'))
                            )
                    )
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-12')
                                    .append(meth.technical_description)
                            )
                    )
                    .append($.jqElem('hr'))
                    .append(
                        $.jqElem('div')
                            .addClass('row')
                            .append(
                                $.jqElem('div')
                                    .addClass('col-md-12')
                                    .append($.jqElem('h4').append('Technical Parameter Details'))
                            )
                    )

            ;

            var $specField = $.jqElem('ul').css('list-style-type', 'none');

            $.each(
                spec[0].parameters,
                function (idx, param) {
                    var $li = $specField.append($.jqElem('li').append('Parameter ' + (idx + 1)));
                    $li.append(
                        $.jqElem('ul')
                            .css('list-style-type', 'none')
                                .append(
                                    $.jqElem('li')
                                        .append(
                                            $.jqElem('b').append(param.ui_name)
                                        )
                                        .append(
                                            $.jqElem('ul')
                                                .css('list-style-type', 'none')
                                                .append($.jqElem('li').append(param.short_hint))
                                                .append($.jqElem('li').append(param.long_hint))
                                        )
                                )
                    );

                    $specField.append($li);


                }
            );

            $res.append($specField);

            var $stats = $.jqElem('div');

            stats = $details.options.mostPopular
                ? $details.options.mostPopular.stats()
                : [];


            var method_stats = stats.by_method[m.id];
            if (method_stats) {
                $stats = $.jqElem('div')
                    .append(stats.by_method[m.id].total_count + ' total calls');

                var $linechart = $.jqElem('div')
                    .css({width : '500px', height : '300px'});

                var lineData = [];
                var labels = [];
                var idx = 0;
                $.each(
                    stats.by_method[m.id].accesses_by_month,
                    function (month, accesses) {
                        lineData.push({x : idx++, xLabel : month, y : accesses});
                        labels.push(month);
                    }
                );

                var $lsc = $.jqElem('div').kbaseLineSerieschart();

                lineData = lineData.sort($lsc.sortByKey('xLabel'));
                labels = labels.sort();

                $linechart.kbaseLineSerieschart(
                    {
                        scaleAxes       : true,

                        xLabel      : 'Month',
                        yLabel      : 'Usage',

                        labels : labels,

                        dataset : [
                            {
                                color : 'blue',
                                values : lineData,
                            },

                        ],

                    }
                );

                $stats.append($linechart);

            }

            var elements = [
                    {
                        title : 'Usage info',
                        body : $res,
                        open : true,
                    },
                ]
            ;

            if ($gal.children().length) {
                elements.unshift(
                    {
                        title : 'Screenshots',
                        body : $gal,
                        open : true,
                    }
                );
            }

            if ($stats.children().length) {
                elements.unshift(
                    {
                        title : 'Usage stats',
                        body : $stats,
                        open : true,
                    }
                );
            }



            var $methAccordion = $.jqElem('div').kbaseAccordion(
                {
                    fontMultiplier : 3,
                    elements : elements
                }
            );

            $details.$elem.empty();
            $details.$elem.append($methAccordion.$elem);

        });},
        //error
        function(e) {
            $details.$elem.empty();
            $details.$elem.append(
                $.jqElem('div')
                    .addClass('alert alert-warning')
                    .append("No information available for " + m.id)
            );
        });
    }

    });
});
