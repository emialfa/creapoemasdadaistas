const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModeSchema = new Schema({
    articulos: String,
    sustantivos: String,
    adjetivos:String,
    verbos:String,
    adverbios:String,
    autor:String,
    poema:String
});

//const Mode = mongoose.model('poemas', ModeSchema);

export default mongoose.models.poemas || mongoose.model("poemas", ModeSchema);