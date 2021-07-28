exports.login = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({
      success: true,
      message: "success",
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
