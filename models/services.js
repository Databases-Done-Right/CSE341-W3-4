module.exports = (mongoose) => {
    const Services = mongoose.model(
      'services',
      mongoose.Schema(
        {
          _id: String,
          name: String,
          companyName: String,
          notes: String,
        },
        { timestamps: true }
      )
    );
  
    return Services;
  };