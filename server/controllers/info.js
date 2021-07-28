const data = require('../data/');
const collections = data.collections;

exports.collection_list = async (req, res) => {
  try {
    let collection_list = await collections.getCollections();
    let list = [];
    for(let i=0; i<collection_list.length; i++){
      list.push(collection_list[i].name);
    }
    res.status(200).json({
      success: true,
      collection_list: list,
    });
    // const records = await User.find({}).lean();
    // if (records) {
    //   res.status(200).json({
    //     success: true,
    //     message: "success",
    //     records
    //   });
    // }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured",
      error: `${error}`
    });
  }
};
