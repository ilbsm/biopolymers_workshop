/*
by Pawel Rubach - 14.06.2018
Gathered procedures and functions used in views of knots and knotoids
 */

function transf_ranges(knot_ranger, structure_start) {
    var KR_array = {};
    var knot_ran = knot_ranger.split(",");
    for (var i = 0; i < knot_ran.length; i++) {
        var tmp_ran = knot_ran[i].split("-");
        for (var j = 0; j < tmp_ran.length; j++) {
            tmp_ran[j] = parseInt(tmp_ran[j]) - structure_start;
        }
        KR_array[tmp_ran[0]] = tmp_ran;
    }
    return KR_array;
}


function gen_handler(ks) {
    jQuery('#btn_' + ks)
        .click(function () {
                jQuery('*[id*=annotate]').css({'opacity': '0', 'display': 'none'});
                jQuery('*[id*=knot_' + ks + ']').fadeTo(100, 1);
                jQuery('*[id*=image_knot_' + ks + ']').fadeTo(100, 1);
            }
        )

}

function colour_sequence(sequence, structure_start, knot_id, knot_range, knot_tails, sknot_tails, sknot_loops) {
    //var sequence = "{{sequence[0]}}";
    //var structure_start = "{{sequence[1]}}";

    var KR_array = transf_ranges(knot_range, structure_start);
    var SL_array = transf_ranges(sknot_loops, structure_start);
    var ST_array = transf_ranges(sknot_tails, structure_start);
    var KT_array = transf_ranges(knot_tails, structure_start);

    var colored_seq = {};
    for (var idx in KT_array) {
        colored_seq[idx] = "<span style='background:#eee'>" + sequence.substring(KT_array[idx][0], KT_array[idx][1] + 1) + "</span>";
    }
    for (var idx in KR_array) {
        colored_seq[idx] = "<span style='background:#d9edf7'>" + sequence.substring(KR_array[idx][0], KR_array[idx][1] + 1) + "</span>";
    }
    for (var idx in ST_array) {
        colored_seq[idx] = "<span style='background:#dff0d8'>" + sequence.substring(ST_array[idx][0], ST_array[idx][1] + 1) + "</span>";
    }
    for (var idx in SL_array) {
        colored_seq[idx] = "<span style='background:#fcf8e3'>" + sequence.substring(SL_array[idx][0], SL_array[idx][1] + 1) + "</span>";
    }

    // sort sequence substrings to get correct order
    var ttt = [];
    for (k in colored_seq)
        ttt.push(k);
    ttt.sort(function (a, b) {
        return a - b;
    }); // javascript is SICK
    var outstring = "";
    for (var i = 0; i < ttt.length; i++) {
        outstring += colored_seq[ttt[i]];
    }

    $("#sequence").html(outstring);//pre_knot+"<span style='background:#0088cc'>"+knot+"</span>"+post_knot);

}


function change_jmol(sequence, structure_start, knot_id, knot_range, slipknot_loop, knot_tail, sknot_tail) {
    var label_array = [];
// TODO poprawic kolorowanie bo jest ZLE

    var sknotloop = slipknot_loop.split(",");
    var slipknot_loop_range1 = sknotloop[0];
    var slipknot_loop_range2 = sknotloop[1];

    for (var i = 1; i < arguments.length; i++) {

        var v = arguments[i].split("-");
        for (var j = 0; j < 2; j++)
            if (typeof v[j] !== "undefined")
                label_array.push(v[j]);

    }
// buttons
    jQuery('#btn_' + knot_id).click(function () {

        colour_sequence(sequence, structure_start, knot_id, knot_range, knot_tail, sknot_tail, slipknot_loop);

        jQuery("*[id*=marker_]").html('');
        jQuery("#marker_" + knot_id).html('<i class="fa fa-map-marker"></i>');


        jQuery("*[id*=row_]").removeClass("info");
        jQuery("#row_" + knot_id).toggleClass("info");
        Jmol.script(jmolApplet0, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 40;color [x333333]");
        if (slipknot_loop_range1 != "")
            Jmol.script(jmolApplet0, "select " + slipknot_loop_range1 + "; color [xfbb450];backbone 80;");
        if (slipknot_loop_range2 != "")
            Jmol.script(jmolApplet0, "select " + slipknot_loop_range2 + "; color [xfbb450];backbone 80;");
        if (sknot_tail != "")
            Jmol.script(jmolApplet0, "select " + sknot_tail + "; color [x5cb85c];backbone 80;");
        for (var i = 0; i < label_array.length; i++)
            Jmol.script(jmolApplet0, "select " + label_array[i] + ".CA;font label 10 monospaced;label %[group]:%[resno];");
        Jmol.script(jmolApplet0, "select " + knot_range + "; color [x0088cc];backbone 100");
    });

    // buttons for Knotoids
    jQuery('#btn_' + knot_id + '_' + knot_range).click(function () {

        jQuery("*[id*=marker_]").html('');
        jQuery("#marker_" + knot_id + "_" + knot_range).html('<i class="fa fa-map-marker"></i>');


        jQuery("*[id*=row_]").removeClass("info");
        jQuery("#row_" + knot_id + "_" + knot_range).toggleClass("info");
        Jmol.script(jmolApplet1, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 40;color [x333333]");
        if (slipknot_loop_range1 != "")
            Jmol.script(jmolApplet1, "select " + slipknot_loop_range1 + "; color [xfbb450];backbone 80;");
        if (slipknot_loop_range2 != "")
            Jmol.script(jmolApplet1, "select " + slipknot_loop_range2 + "; color [xfbb450];backbone 80;");
        if (sknot_tail != "")
            Jmol.script(jmolApplet1, "select " + sknot_tail + "; color [x5cb85c];backbone 80;");
        for (var i = 0; i < label_array.length; i++)
            Jmol.script(jmolApplet1, "select " + label_array[i] + ".CA;font label 10 monospaced;label %[group]:%[resno];");
        Jmol.script(jmolApplet1, "select " + knot_range + "; color [x0088cc];backbone 100");
    });
}

function sortNumber(a,b) {
    return a - b;
}

function uncolour_sequence(sequence){
    outstring = "<span style='background:#eee'>" + sequence + "</span>"
    $("#sequence_loop").html(outstring);
}


//view details button
function loop_knot_details(sequence, loop_nr, knot_type,knot_range,slipknot_loop,slipknot_tails,first,bridges,atoms,beads,cylinders, ranges){
    jQuery('*[id*=annotate]').css({'opacity': '0', 'display': 'none'});
    jQuery('*[id*=knot_' + knot_type + ']').fadeTo(100, 1);
    //jQuery('*[id*=image_knot_' + knot_type + ']').fadeTo(100, 1);
    jQuery("*[id*=marker_]").html('');
    jQuery("#marker_loop" + loop_nr).html('<i class="fa fa-map-marker"></i>');
    jQuery("#marker_loop"+String(loop_nr)+"_knot" + knot_type).html('<i class="fa fa-map-marker"></i>');
    Jmol.script(jmolApplet2, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 10;color [x808080]; draw delete; isosurface delete");
    for (var i=0; i < ranges.length; i+=2){
        if (parseInt(ranges[i]) < parseInt(ranges[i+1])) {
            atom1 = (parseInt(ranges[i]) - first + 1).toString();
            atom2 = (parseInt(ranges[i+1]) - first + 1).toString();
            }
        if (parseInt(ranges[i+1]) < parseInt(ranges[i])) {
            atom1 = (parseInt(ranges[i+1]) - first + 1).toString();
            atom2 = (parseInt(ranges[i]) - first + 1).toString();
            }
        Jmol.script(jmolApplet2, "select " + atom1 + "-" + atom2 + "; color [x333333];backbone 40;");
        }
    for (var i=0; i < bridges.length; i+=2){
        if (bridges[i] != first && bridges[i+1] != first) {
            Jmol.script(jmolApplet2,"draw cylinder"+i+" (" + (parseInt(bridges[i]) - first + 1).toString() + ".CA) (" + (parseInt(bridges[i+1]) - first + 1).toString() + ".CA) radius 0.23;");
            Jmol.script(jmolApplet2,"isosurface i"+i+" center ("  + (parseInt(bridges[i]) - first + 1).toString() + ".CA) color darkviolet sphere 0.8;");
            Jmol.script(jmolApplet2,"isosurface i"+i+1+" center ("  + (parseInt(bridges[i+1]) - first + 1).toString() + ".CA) color darkviolet sphere 0.8;")
            }
    }
    for (var i=parseInt(knot_range.split('-')[0]); i < parseInt(knot_range.split('-')[1]); i++){                    //not all intervals are fully colored
        if (atoms[i] - atoms[i+1] == 1) {
            Jmol.script(jmolApplet2, "select " + (parseInt(atoms[i+1]) - first + 1).toString() + "-" + (parseInt(atoms[i]) - first + 1).toString() + "; color [x0088cc];backbone 100");
            }
        if (atoms[i+1] - atoms[i] == 1) {
            Jmol.script(jmolApplet2, "select " + (parseInt(atoms[i]) - first + 1).toString() + "-" + (parseInt(atoms[i+1]) - first + 1).toString() + "; color [x0088cc];backbone 100");
            }
        }
    for (var i=0; i < slipknot_loop.split(',').length; i++){
        atom1 = parseInt(slipknot_loop.split(',')[i].split('-')[0]);
        atom2 = parseInt(slipknot_loop.split(',')[i].split('-')[1]);
        for (var j=atom1; j < atom2; j++){
            if (atoms[j] - atoms[j+1] == 1) {
                Jmol.script(jmolApplet2, "select " + (parseInt(atoms[j+1]) - first + 1).toString() + "-" + (parseInt(atoms[j]) - first + 1).toString() + "; color [xfbb450];backbone 80;");
                }
            if (atoms[j+1] - atoms[j] == 1) {
                Jmol.script(jmolApplet2, "select " + (parseInt(atoms[j]) - first + 1).toString() + "-" + (parseInt(atoms[j+1]) - first + 1).toString() + "; color [xfbb450];backbone 80;");
                }
            }
        }
    for (var i=0; i < slipknot_tails.split(',').length; i++){
        atom1 = parseInt(slipknot_tails.split(',')[i].split('-')[0]);
        atom2 = parseInt(slipknot_tails.split(',')[i].split('-')[1]);
        for (var j=atom1; j < atom2; j++){
            if (atoms[j] - atoms[j+1] == 1) {
                Jmol.script(jmolApplet2, "select " + (parseInt(atoms[j+1]) - first + 1).toString() + "-" + (parseInt(atoms[j]) - first + 1).toString() + "; color [x5cb85c];backbone 80;");
                }
            if (atoms[j+1] - atoms[j] == 1) {
                Jmol.script(jmolApplet2, "select " + (parseInt(atoms[j]) - first + 1).toString() + "-" + (parseInt(atoms[j+1]) - first + 1).toString() + "; color [x5cb85c];backbone 80;");
                }
            }
        }
    // Do we need to add the sequence coloring? Wouldn't that be to complicated?
    // BTW It would be better to keep appropriate values in the database, not to calculate it each time... It takes time.
    if (beads.length > 0) {
        Jmol.script(jmolApplet2, "isosurface delete;");
        for (var i=0; i < beads.length; i++){
            atom = beads[i].split(",");
            Jmol.script(jmolApplet2,"isosurface i"+i+" center {"  + atom[0] + "} color " + atom[1] + " sphere 0.8;");
            }
        }
    if (cylinders.length > 0){
        Jmol.script(jmolApplet2, "draw delete;");
        for (var i=0; i < cylinders.length; i++){
            atom = cylinders[i].split(",");
            Jmol.script(jmolApplet2,"draw cylinder"+i+" {" + atom[0] + "} {" + atom[1] + "} radius 0.23 color " + atom[2] + ";");
            }
        }
    }


//knot details button
function loop_details(sequence,ranges,bridges,beads,cylinders,first,loop_nr,pdb,chain,knot_type) {
    uncolour_sequence(sequence);
    jQuery('#svg-main_loop').load("/static/knot_data/" + pdb + "/" + chain + "/" + pdb + "_" + chain + "_loop" + loop_nr + ".svg",function(){
        jQuery('*[id*=annotate]').css({'opacity': '0', 'display': 'none'});         //why does it not work?
        jQuery('*[id*=knot_' + knot_type + ']').fadeTo(100, 1);
        });
    jQuery("*[id*=details_loop]").css("display","none");
    jQuery("#details_loop"+String(loop_nr)).each(function() {
        $( this ).css("display","table-row");
        });
    jQuery("*[id*=marker_]").html('');
    jQuery("#marker_loop" + loop_nr).html('<i class="fa fa-map-marker"></i>');
    jQuery("#marker_loop"+String(loop_nr)+"_knot"+knot_type).html('<i class="fa fa-map-marker"></i>');
    jQuery("#knot_loop_info").css("display","block");
    Jmol.script(jmolApplet2, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 40;color [x333333]; draw delete; isosurface delete");
    for (var i=0; i < ranges.length; i+=2){
        if (parseInt(ranges[i]) < parseInt(ranges[i+1])) {
            atom1 = (parseInt(ranges[i]) - first + 1).toString();
            atom2 = (parseInt(ranges[i+1]) - first + 1).toString();
            }
        if (parseInt(ranges[i+1]) < parseInt(ranges[i])) {
            atom1 = (parseInt(ranges[i+1]) - first + 1).toString();
            atom2 = (parseInt(ranges[i]) - first + 1).toString();
            }
        Jmol.script(jmolApplet2, "select " + atom1 + "-" + atom2 + "; color [xFF0000];backbone 80;");
        }
    for (var i=0; i < bridges.length; i+=2){
        if (bridges[i] != first && bridges[i+1] != first) {
            Jmol.script(jmolApplet2,"draw cylinder"+i+" (" + (parseInt(bridges[i]) - first + 1).toString() + ".CA) (" + (parseInt(bridges[i+1]) - first + 1).toString() + ".CA) radius 0.23;");
            Jmol.script(jmolApplet2,"isosurface i"+i+" center ("  + (parseInt(bridges[i]) - first + 1).toString() + ".CA) color darkviolet sphere 0.8;");
            Jmol.script(jmolApplet2,"isosurface i"+i+1+" center ("  + (parseInt(bridges[i+1]) - first + 1).toString() + ".CA) color darkviolet sphere 0.8;")
            }
        }
    if (beads.length > 0) {
        Jmol.script(jmolApplet2, "isosurface delete;");
        for (var i=0; i < beads.length; i++){
            atom = beads[i].split(",");
            Jmol.script(jmolApplet2,"isosurface i"+i+" center {"  + atom[0] + "} color " + atom[1] + " sphere 0.8;");
            }
        }
    if (cylinders.length > 0){
        Jmol.script(jmolApplet2, "draw delete;");
        for (var i=0; i < cylinders.length; i++){
            atom = cylinders[i].split(",");
            Jmol.script(jmolApplet2,"draw cylinder"+i+" {" + atom[0] + "} {" + atom[1] + "} radius 0.23 color " + atom[2] + ";");
            }
        }
    }

//color sequence button
function color_sequence_loop(sequences,ranges,bridges,colors,colors_jsmol,beads,cylinders,first,loop_nr,knot_type,pdb,chain) {
    var outstring = ''
    jQuery("*[id*=details_loop]").css("display","none");
    jQuery("#details_loop"+String(loop_nr)).each(function() {
        $( this ).css("display","table-row");
        });
    jQuery("*[id*=marker_]").html('');
    jQuery("#marker_loop" + loop_nr).html('<i class="fa fa-map-marker"></i>');
    jQuery("#marker_loop"+String(loop_nr)+"_knot"+knot_type).html('<i class="fa fa-map-marker"></i>');
    jQuery("#knot_loop_info").css("display","block");
    jQuery('#svg-main_loop').load("/static/knot_data/" + pdb + "/" + chain + "/" + pdb + "_" + chain + "_loop" + loop_nr + ".svg", function(){
        jQuery('*[id*=annotate]').css({'opacity': '0', 'display': 'none'});
        jQuery('*[id*=knot_'+knot_type+']').fadeTo(100,1);
        });

    for (var i=0; i < sequences.length; i++){
        outstring += "<span style='background:#" + colors[i] + "'>" + sequences[i] + "</span>";
        }
    $("#sequence_loop").html(outstring);
    Jmol.script(jmolApplet2, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 40;color [x333333]; draw delete; isosurface delete");
    for (var i=0; i < ranges.length; i+=2){
        if (parseInt(ranges[i]) < parseInt(ranges[i+1])) {
            atom1 = (parseInt(ranges[i]) - first + 1).toString();
            atom2 = (parseInt(ranges[i+1]) - first + 1).toString();
            }
        if (parseInt(ranges[i+1]) < parseInt(ranges[i])) {
            atom1 = (parseInt(ranges[i+1]) - first + 1).toString();
            atom2 = (parseInt(ranges[i]) - first + 1).toString();
            }
        Jmol.script(jmolApplet2, "select " + atom1 + "-" + atom2 + "; color [x" + colors_jsmol[i/2] + "];backbone 80;");
        }
    for (var i=0; i < bridges.length; i+=2){
        if (bridges[i] != first && bridges[i+1] != first) {
            if (parseInt(bridges[i]) < parseInt(bridges[i+1])) {
                atom1 = (parseInt(bridges[i]) - first + 1).toString();
                atom2 = (parseInt(bridges[i+1]) - first + 1).toString();
                }
            if (parseInt(bridges[i+1]) < parseInt(bridges[i])) {
                atom1 = (parseInt(bridges[i+1]) - first + 1).toString();
                atom2 = (parseInt(bridges[i]) - first + 1).toString();
                }
            Jmol.script(jmolApplet2,"draw cylinder"+i+" (" + atom1 + ".CA) (" + atom2 + ".CA) radius 0.23;");
            }
        }
    if (beads.length > 0) {
        Jmol.script(jmolApplet2, "isosurface delete;");
        for (var i=0; i < beads.length; i++){
            atom = beads[i].split(",");
            Jmol.script(jmolApplet2,"isosurface i"+i+" center {"  + atom[0] + "} color " + atom[1] + " sphere 0.8;");
            }
        }
    if (cylinders.length > 0){
        Jmol.script(jmolApplet2, "draw delete;");
        for (var i=0; i < cylinders.length; i++){
            atom = cylinders[i].split(",");
            Jmol.script(jmolApplet2,"draw cylinder"+i+" {" + atom[0] + "} {" + atom[1] + "} radius 0.23 color " + atom[2] + ";");
            }
        }
    }