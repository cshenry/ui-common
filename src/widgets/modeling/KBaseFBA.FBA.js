function KBaseFBA_FBA(modeltabs) {
    var self = this;
    this.modeltabs = modeltabs;

    this.tabList = [{
        "key": "overview",
        "name": "Overview",
        "type": "verticaltbl",
        "rows": [{
            "label": "ID",
            "key": "wsid"
        },{
            "label": "Object type",
            "key": "objecttype",
            "type": "typelink"
        },{
            "label": "Owner",
            "key": "owner"
        },{
            "label": "Version",
            "key": "instance"
        },{
            "label": "Mod-date",
            "key": "moddate"
        },{
            "label": "Objective value",
            "key": "objective"
        },{
            "label": "Objective function",
            "key": "objectivefunction"
        },{
            "label": "Model",
            "key": "model",
            "type": "wslink"
        },{
            "label": "Media",
            "key": "media",
            "type": "wslink"
        },{
            "label": "Regulome",
            "key": "regulome",
            "type": "wslink"
        },{
            "label": "Prom Constraint",
            "key": "promconstraint",
            "type": "wslink"
        },{
            "label": "Expression",
            "key": "expression",
            "type": "wslink"
        },{
            "label": "Single KO",
            "key": "singleko"
        },{
            "label": "Number reactions",
            "key": "numreactions"
        },{
            "label": "Number compounds",
            "key": "numcompounds"
        },{
            "label": "Gene KO",
            "key": "numgeneko"
        },{
            "label": "Reaction KO",
            "key": "numrxnko"
        },{
            "label": "Custom bounds",
            "key": "numcpdbounds"
        },{
            "label": "Custom constraints",
            "key": "numconstraints"
        },{
            "label": "Media supplements",
            "key": "numaddnlcpds"
        },{
            "label": "Uptake limits",
            "key": "uptakelimits"
        },{
            "label": "Uptake limits",
            "key": "uptakelimits"
        },{
            "label": "Minimize fluxes?",
            "key": "minfluxes",
            "type": "boolean"
        },{
            "label": "Find minimal media?",
            "key": "findminmedia",
            "type": "boolean"
        },{
            "label": "Minimize reactions?",
            "key": "minimizerxn",
            "type": "boolean"
        },{
            "label": "All reactions reversible?",
            "key": "allreversible",
            "type": "boolean"
        },{
            "label": "Thermodynamic constraints?",
            "key": "simplethermo",
            "type": "boolean"
        },{
            "label": "Objective fraction",
            "key": "objfraction"
        }]
    }, {
        "key": "modelreactions",
        "name": "Reactions",
        "visible": 1,
        "columns": [{
            "label": "Reaction",
            "key": "id",
            "type": "tabLink",
            "linkformat": "dispIDCompart",
            "method": "ReactionTab",
            "width": "15%",
            "visible": 1
        }, {
            "label": "Flux",
            "key": "flux",
            "visible": 1
        }, {
            "label": "Min flux<br>(Lower bound)",
            "key": "disp_low_flux",
            "visible": 1
        }, {
            "label": "Max flux<br>(Upper bound)",
            "key": "disp_high_flux",
            "visible": 1
        }, {
            "label": "Class",
            "key": "fluxClass",
            "visible": 1
        }, {
            "label": "Equation",
            "key": "equation",
            "visible": 1
        }, {
            "label": "Genes",
            "key": "genes",
            "type": "tabLinkArray",
            "method": "GeneTab",
            "visible": 1
        }]
    }, {
        "key": "compoundFluxes",
        "name": "Compounds",
        "visible": 1,
        "columns": [{
            "label": "Compound",
            "key": "id",
            "type": "tabLink",
            "linkformat": "dispIDCompart",
            "method": "CompoundTab",
            "visible": 1
        }, {
            "label": "Name",
            "key": "name",
            "visible": 1
        }, {
            "label": "Uptake flux",
            "key": "uptake",
            "visible": 1
        }, {
            "label": "Min flux<br>(Lower bound)",
            "key": "disp_low_flux",
            "visible": 1
        }, {
            "label": "Max flux<br>(Upper bound)",
            "key": "disp_high_flux",
            "visible": 1
        }, {
            "label": "Class",
            "key": "fluxClass",
            "visible": 1
        }, {
            "label": "Formula",
            "key": "formula",
            "visible": 1
        }, {
            "label": "Charge",
            "key": "charge",
            "visible": 1
        }, {
            "label": "Compartment",
            "key": "cmpkbid",
            "type": "tabLink",
            "method": "CompartmentTab",
            "visible": 1
        }]
    }, {
        "key": "modelgenes",
        "name": "Genes",
        "visible": 1,
        "columns": [{
            "label": "Gene",
            "key": "id",
            "type": "tabLink",
            "method": "GeneTab",
            "visible": 1
        }, {
            "label": "Gene knocked out",
            "key": "ko",
            "visible": 1
        },{
            "label": "Fraction of growth with KO",
            "key": "growthFraction",
            "visible": 0
        }]
    }, {
        "key": "biomasscpds",
        "name": "Biomass compounds",
        "visible": 1,
        "columns": [{
            "label": "Biomass",
            "key": "biomass",
            "type": "tabLink",
            "method": "BiomassTab",
            "visible": 1
        }, {
            "label": "Biomass flux",
            "key": "bioflux",
            "visible": 1
        }, {
            "label": "Name",
            "key": "name",
            "visible": 1
        }, {
            "label": "Coefficient",
            "key": "coefficient",
            "visible": 1
        }, {
            "label": "Compartment",
            "key": "cmpkbid",
            "type": "tabLink",
            "method": "CompartmentTab",
            "visible": 1
        }, {
            "label": "Max production",
            "key": "maxprod",
            "visible": 0
        }]
    }];

    this.setMetadata = function (indata) {
        this.workspace = indata[7];
        this.objName = indata[1];
        this.overview = {wsid: indata[7]+"/"+indata[1],
                         ws: indata[7],
                         obj_name: indata[1],
                         objecttype: indata[2],
                         owner: indata[5],
                         instance: indata[4],
                         moddate: indata[3]}

        this.usermeta = {};

        // if there is user metadata, add it
        if ('Model' in indata[10]) {
            this.usermeta = {objective: indata[10]["Objective"],
                             model: indata[10]["Model"],
                             media: indata[10]["Media"],
                             singleko: indata[10]["Combination deletions"],
                             numreactions: indata[10]["Number reaction variables"],
                             numcompounds: indata[10]["Number compound variables"],
                             numgeneko: indata[10]["Number gene KO"],
                             numrxnko: indata[10]["Number reaction KO"],
                             numcpdbounds: indata[10]["Number compound bounds"],
                             numconstraints: indata[10]["Number constraints"],
                             numaddnlcpds: indata[10]["Number additional compounds"]}

            $.extend(this.overview, this.usermeta)
        }
    };

    this.formatObject = function () {
        console.log(this);
        this.usermeta.model = self.data.fbamodel_ref;
        this.usermeta.media = self.data.media_ref;
        this.usermeta.objective = self.data.objectiveValue;
        this.usermeta.minfluxes = self.data.fluxMinimization;
        this.usermeta.findminmedia = self.data.findMinimalMedia;
        this.usermeta.minimizerxn = self.data.minimize_reactions;
        this.usermeta.allreversible = self.data.allReversible;
        this.usermeta.simplethermo = self.data.simpleThermoConstraints;
        this.usermeta.objfraction = self.data.objectiveConstraintFraction;
        this.usermeta.regulome = self.data.regulome_ref;
        this.usermeta.promconstraint = self.data.promconstraint_ref;
        this.usermeta.expression = self.data.tintlesample_ref;
        this.usermeta.phenotypeset = self.data.phenotypeset_ref;
        this.usermeta.phenotypesimulationset = self.data.phenotypesimulationset_ref;
        this.usermeta.singleko = self.data.comboDeletions;
        this.usermeta.defaultmaxflux = self.data.defaultMaxFlux;
        this.usermeta.defaultmaxdrain = self.data.defaultMaxDrainFlux;
        this.usermeta.defaultmindrain = self.data.defaultMinDrainFlux;
        this.usermeta.phenotypesimulationset = self.data.phenotypesimulationset_ref;
        this.usermeta.uptakelimits = "";
        for (var key in self.data.uptakelimits) {
            if (this.usermeta.uptakelimits.length > 0) {
                this.usermeta.uptakelimits += "<br>";
            }
            this.usermeta.uptakelimits += key+":"+this.uptakelimits[key];
        }
        this.usermeta.objectivefunction = "Minimize{";
        if (self.data.maximizeObjective == 1) {
            this.usermeta.objectivefunction = "Maximize{";
        }
        for (var key in self.data.compoundflux_objterms) {
            this.usermeta.objectivefunction += " ("+self.data.compoundflux_objterms[key]+") "+key;
        }
        for (var key in self.data.reactionflux_objterms) {
            this.usermeta.objectivefunction += " ("+self.data.reactionflux_objterms[key]+") "+key;
        }
        for (var key in self.data.biomassflux_objterms) {
            this.usermeta.objectivefunction += " ("+self.data.biomassflux_objterms[key]+") "+key;
        }
        this.usermeta.objectivefunction += "}";
        this.modelreactions = this.model.modelreactions;
        this.modelcompounds = this.model.modelcompounds;
        this.biomasses = this.model.biomasses;
        this.biomasscpds = this.model.biomasscpds;
        this.modelgenes = this.model.modelgenes;
        this.FBAConstraints = self.data.FBAConstraints;
        this.FBAMinimalMediaResults = self.data.FBAMinimalMediaResults;
        this.FBAMinimalReactionsResults = self.data.FBAMinimalReactionsResults;
        this.FBAMetaboliteProductionResults = self.data.FBAMetaboliteProductionResults;
        this.rxnhash = {};
        for (var i=0; i < self.data.FBAReactionVariables.length; i++) {
            var rxnid = self.data.FBAReactionVariables[i].modelreaction_ref.split("/").pop();
            self.data.FBAReactionVariables[i].ko = 0;
            this.rxnhash[rxnid] = self.data.FBAReactionVariables[i];
        }
        for (var i=0; i < self.data.reactionKO_refs.length; i++) {
            var rxnid = self.data.reactionKO_refs[i].split("/").pop();
            this.rxnhash[rxnid].ko = 1;
        }
        this.cpdhash = {};
        for (var i=0; i < self.data.FBACompoundVariables.length; i++) {
            var cpdid = self.data.FBACompoundVariables[i].modelcompound_ref.split("/").pop();
            self.data.FBACompoundVariables[i].additionalcpd = 0;
            this.cpdhash[cpdid] = self.data.FBACompoundVariables[i];
        }
        for (var i=0; i < self.data.additionalCpd_refs.length; i++) {
            var cpdid = self.data.additionalCpd_refs[i].split("/").pop();
            this.cpdhash[cpdid].additionalcpd = 1;
        }
        this.biohash = {};
        for (var i=0; i < self.data.FBABiomassVariables.length; i++) {
            var bioid = self.data.FBABiomassVariables[i].biomass_ref.split("/").pop();
            this.biohash[bioid] = self.data.FBABiomassVariables[i];
        }
        this.maxpod = 0;
        this.metprodhash = {};
        for (var i=0; i < this.FBAMetaboliteProductionResults.length; i++) {
            this.tabList[4].columns[5].visible = 1;
            var metprod = self.data.FBAMetaboliteProductionResults[i];
            var cpdid = metprod.modelcompound_ref.split("/").pop();
            this.metprodhash[cpdid] = metprod;
        }
        this.genehash = {};
        for (var i=0; i < this.modelgenes.length; i++) {
            this.genehash[this.modelgenes[i].id] = this.modelgenes[i];
            this.genehash[this.modelgenes[i].id].ko = 0;
        }
        console.log('genehash', this.genehash)
        /*
        for (var i=0; i < self.data.geneKO_refs.length; i++) {
            var geneid = self.data.geneKO_refs[i].split("/").pop();
            this.genehash[geneid].ko = 1;
        }*/
        this.delhash = {};
        for (var i=0; i < self.data.FBADeletionResults.length; i++) {
            var geneid = self.data.FBADeletionResults[i].feature_refs[0].split("/").pop();
            this.delhash[geneid] = self.data.FBADeletionResults[i];
        }
        this.cpdboundhash = {};
        for (var i=0; i < self.data.FBACompoundBounds.length; i++) {
            var cpdid = self.data.FBACompoundBounds[i].modelcompound_ref.split("/").pop();
            this.cpdboundhash[cpdid] = self.data.FBACompoundBounds[i];
        }
        this.rxnboundhash = {};
        for (var i=0; i < self.data.FBAReactionBounds.length; i++) {
            var rxnid = self.data.FBAReactionBounds[i].modelreaction_ref.split("/").pop();
            this.rxnboundhash[rxnid] = self.data.FBAReactionBounds[i];
        }
        for (var i=0; i< this.modelgenes.length; i++) {
            var mdlgene = this.modelgenes[i];
            if (this.genehash[mdlgene.id]) {
                mdlgene.ko = this.genehash[mdlgene.id].ko;
            }
            if (this.delhash[mdlgene.id]) {
                mdlgene.growthFraction = this.delhash[mdlgene.id].growthFraction;
            }
        }
        for (var i=0; i< this.modelreactions.length; i++) {
            var mdlrxn = this.modelreactions[i];
            if (this.rxnhash[mdlrxn.id]) {
                mdlrxn.upperFluxBound = this.rxnhash[mdlrxn.id].upperBound;
                mdlrxn.lowerFluxBound = this.rxnhash[mdlrxn.id].lowerBound;
                mdlrxn.fluxMin = this.rxnhash[mdlrxn.id].min;
                mdlrxn.fluxMax = this.rxnhash[mdlrxn.id].max;
                mdlrxn.flux = this.rxnhash[mdlrxn.id].value;
                mdlrxn.fluxClass = this.rxnhash[mdlrxn.id].class;
                mdlrxn.disp_low_flux = mdlrxn.fluxMin + "<br>(" + mdlrxn.lowerFluxBound + ")";
                mdlrxn.disp_high_flux = mdlrxn.fluxMax + "<br>(" + mdlrxn.upperFluxBound + ")";
            }
            if (this.rxnboundhash[mdlrxn.id]) {
                mdlrxn.customUpperBound = this.rxnboundhash[mdlrxn.id].upperBound;
                mdlrxn.customLowerBound = this.rxnboundhash[mdlrxn.id].lowerBound;
            }
        }
        this.compoundFluxes = [];
        this.cpdfluxhash = {};
        for (var i=0; i< this.modelcompounds.length; i++) {
            var mdlcpd = this.modelcompounds[i];
            if (this.cpdhash[mdlcpd.id]) {
                mdlcpd.upperFluxBound = this.cpdhash[mdlcpd.id].upperBound;
                mdlcpd.lowerFluxBound = this.cpdhash[mdlcpd.id].lowerBound;
                mdlcpd.fluxMin = this.cpdhash[mdlcpd.id].min;
                mdlcpd.fluxMax = this.cpdhash[mdlcpd.id].max;
                mdlcpd.uptake = this.cpdhash[mdlcpd.id].value;
                mdlcpd.fluxClass = this.cpdhash[mdlcpd.id].class;
                mdlcpd.disp_low_flux = mdlcpd.fluxMin + "<br>(" + mdlcpd.lowerFluxBound + ")";
                mdlcpd.disp_high_flux = mdlcpd.fluxMax + "<br>(" + mdlcpd.upperFluxBound + ")";
                this.cpdfluxhash[mdlcpd.id] = mdlcpd;
                this.compoundFluxes.push(mdlcpd);
            }
            if (this.metprodhash[mdlcpd.id]) {
                mdlcpd.maxProd = this.metprodhash[mdlcpd.id].maximumProduction;
                //if (!this.cpdfluxhash[mdlcpd.id]) {
                //  this.compoundFluxes.push(mdlcpd);
                //}
            }
            if (this.cpdboundhash[mdlcpd.id]) {
                mdlcpd.customUpperBound = this.cpdboundhash[mdlcpd.id].upperBound;
                mdlcpd.customLowerBound = this.cpdboundhash[mdlcpd.id].lowerBound;
                if (!this.cpdfluxhash[mdlcpd.id]) {
                    this.compoundFluxes.push(mdlcpd);
                }
            }
        }
        for (var i=0; i< this.biomasses.length; i++) {
            var bio = this.biomasses[i];
            if (this.biohash[bio.id]) {
                bio.upperFluxBound = this.biohash[bio.id].upperBound;
                bio.lowerFluxBound = this.biohash[bio.id].lowerBound;
                bio.fluxMin = this.biohash[bio.id].min;
                bio.fluxMax = this.biohash[bio.id].max;
                bio.flux = this.biohash[bio.id].value;
                bio.fluxClass = this.biohash[bio.id].class;
                this.modelreactions.push(bio);
            } else {
                this.biohash[bio.id] = bio;
                bio.upperFluxBound = 1000;
                bio.lowerFluxBound = 0;
                bio.fluxMin = 0;
                bio.fluxMax = 1000;
                bio.flux = 0;
                bio.fluxClass = "Blocked";
                this.modelreactions.push(bio);
            }
            bio.disp_low_flux = bio.fluxMin + "<br>(" + bio.lowerFluxBound + ")";
            bio.disp_high_flux = bio.fluxMax + "<br>(" + bio.upperFluxBound + ")";
        }
        for (var i=0; i < this.biomasscpds.length; i++) {
            var biocpd = this.biomasscpds[i];
            if (this.biohash[biocpd.biomass]) {
                biocpd.bioflux = this.biohash[biocpd.biomass].flux;
            }
            if (this.metprodhash[biocpd.id]) {
                biocpd.maxprod = this.metprodhash[biocpd.id].maximumProduction;
            }
        }
    };

    this.setData = function (indata) {
        self.data = indata;
        var p = self.modeltabs.kbapi('ws', 'get_objects', [{ref: indata.fbamodel_ref}])
                    .done(function(data){
                        var kbObjects = new KBObjects();
                        self.model = new kbObjects["KBaseFBA_FBAModel"](self.modeltabs);
                        self.model.setMetadata(data[0].info);
                        var setMethod = self.model.setData(data[0].data);
                        // see if setData method returns promise or not
                        if (setMethod && 'done' in setMethod) {
                            setMethod.done(function() {
                                self.formatObject()
                            })
                        } else {
                            self.formatObject();
                        }
        })
        return p;
    };

    this.ReactionTab = function (info) {
        if (info.id.search(/rxn\d+/g) == -1)
            return;

        var p = this.modeltabs
                    .getBiochemReaction(info.id)
                    .then(function(rxn){
                        return [{
                                   "label": "ID",
                                    "data": rxn.id
                                },{
                                    "label": "Name",
                                    "data": rxn.name
                                },{
                                    "label": "Equation",
                                    "data": rxn.equation,
                                    "type": "pictureEquation"
                                },/*{
                                    "label": "GPR",
                                    "data": rxn.gpr,
                            }*/];
                     })
        return p;
    };

    this.GeneTab = function (info) {
        var gene = this.genehash[info.id];

        return [{
                "label": "ID",
                "data": info.id
            },{
                "label": "Reactions",
                "data": gene.reactions,
                "type": "tabLinkArray"
        }];
    };

    this.CompoundTab = function (info) {
        var cpd = this.cpdhash[info.id];
        if (info.id.search(/cpd\d+/g) == -1)
            return;

         // your hash includes the compartement, so cpd.compartment (or cpd.cmpkbid?) is missing
        var p = this.modeltabs
                    .getBiochemCompound(info.id)
                    .then(function(cpd){
                        return [{
                                     "label": "Compound",
                                     "data": cpd.id,
                                 }, {
                                     "label": "Name",
                                     "data": "name"
                                 }, {
                                     "label": "Formula",
                                     "data": "formula"
                                 }, {
                                     "label": "Charge",
                                     "data": "charge"
                                 }, {
                                     "label": "Compartment",
                                     "data": cpd.compartment,
                                     "type": "tabLink",
                                     "function": "CompartmentTab"
                                 }];
                     })
        return p;

    };

    this.CompartmentTab = function (id) {
        return [[]];
    };

    this.BiomassTab = function (id) {
        return [[]];
    };

    this.GapfillTab = function (id) {
        return [[]];
    };
}

// make method of base class
KBObjects.prototype.KBaseFBA_FBA = KBaseFBA_FBA;