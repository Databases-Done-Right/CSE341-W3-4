module.exports = (mongoose) => {
    const Companies = mongoose.model(
      'companies',
      mongoose.Schema(
        {
          _id: String,
          name: String,
          address: String,
          city: String,
          state: String,
          zipCode: String,
          website: String,
          phoneNumber: String,
          email: String,
        },
        { timestamps: true }
      )
    );
  
    return Companies;
  };