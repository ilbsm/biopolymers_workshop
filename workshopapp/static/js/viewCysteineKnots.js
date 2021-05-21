/*
viewKnotsAndKnotoids.js by Pawel Rubach - 14.06.2018;
converted then to view cysteine knot (color sequence and jsmol).
 */

function colour_sequence_cysteine(sequence, structure_start, loops_range, bridges_range, piercings_range, rest_range) {
    var loops_array = transf_ranges(loops_range, structure_start);
    var bridges_array = transf_ranges(bridges_range, structure_start);
    var piercings_array = transf_ranges(piercings_range, structure_start);
    var rest_array = transf_ranges(rest_range, structure_start);

    var colored_seq = {};
    for (var idx in loops_array) {
        colored_seq[idx] = '<span class="cysteine_loop_bgcolor">' + sequence.substring(loops_array[idx][0], loops_array[idx][1] + 1) + '</span>';
    }
    for (var idx in bridges_array) {
        colored_seq[idx] = '<span class="cysteine_bridge_bgcolor">' + sequence.substring(bridges_array[idx][0], bridges_array[idx][1] + 1) + '</span>';
    }
    for (var idx in piercings_array) {
        colored_seq[idx] = '<span class="cysteine_piercing_bgcolor">' + sequence.substring(piercings_array[idx][0], piercings_array[idx][1] + 1) + '</span>';
    }
    for (var idx in rest_array) {
        colored_seq[idx] = sequence.substring(rest_array[idx][0], rest_array[idx][1] + 1); 
    }

    // sort sequence substrings to get correct order
    var ttt = [];
    for (k in colored_seq)
        ttt.push(k);
    ttt.sort(function (a, b) {
        return a - b;
    });
    var outstring = "";
    for (var i = 0; i < ttt.length; i++) {
        outstring += colored_seq[ttt[i]];
    }

    $("#sequence").html(outstring);

}


function change_jmol_cysteine(sequence, structure_start, row_id, loops_range, full_loops_range, bridges_range, no_sorted_bridges_range, piercings_range, rest_range) {
// buttons
    jQuery('#btn_cysteine_' + row_id).click(function () {

        colour_sequence_cysteine(sequence, structure_start, loops_range, bridges_range, piercings_range, rest_range);

        jQuery("*[id*=marker_]").html('');
        jQuery("#marker_cysteine" + row_id).html('<i class="fa fa-map-marker"></i>');


        jQuery("*[id*=row_]").removeClass("info");
        jQuery("#row_cysteine" + row_id).toggleClass("info");

        var isosurface_counter = 0;
        var cylinder_counter = 0;
        Jmol.script(jmolApplet3, "set platformSpeed 6;select protein;cartoons off;rockets off;ribbon off;spacefill off;wireframe off;set labels off; backbone 40;color [x333333]");
        if (full_loops_range != "")
            Jmol.script(jmolApplet3, "select " + full_loops_range + "; color [x0088cc]; backbone 100; ");
        if (no_sorted_bridges_range != "")
            var new_bridges = [];
            x = (no_sorted_bridges_range.split(','));
            x.forEach(function(e) {
                new_bridges.push(e.split('-')[0]);
            });
            for (var i = 0; i < new_bridges.length; i++) {
                if (i % 2 == 1) {
                    cylinder_counter++;
                    Jmol.script(jmolApplet3, "draw cylinder" + cylinder_counter + " (" + new_bridges[i] + ") (" + new_bridges[(i+1)%new_bridges.length] + ") radius 0.5 ; draw color orange;");
                }
                isosurface_counter++;
                Jmol.script(jmolApplet3, "isosurface i" + isosurface_counter + " center (" + new_bridges[i] + ") color orange sphere 1");
            }
        if (piercings_range != "")
            var new_piercings = [];
            x = (piercings_range.split(','));
            x.forEach(function(e) {
                new_piercings.push(e.split('-')[0]);
            });
            for (var i = 0; i < new_piercings.length; i++) {
                if (i % 2 == 1) {
                    cylinder_counter++;
                    Jmol.script(jmolApplet3, "draw cylinder" + cylinder_counter + " (" + new_piercings[i-1] + ") (" + new_piercings[i] + ") radius 0.5 ; draw color red;");
                }
                isosurface_counter += 1;
                Jmol.script(jmolApplet3, "isosurface i" + isosurface_counter + " center (" + new_piercings[i] + ") color red sphere 1");
            }
    return false;
    });
}

