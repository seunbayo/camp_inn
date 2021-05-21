# camp_inn

  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campinn({

      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    })
    await camp.save();
  }

  .then(() => {
    mongoose.connection.close();
  });

const sample = array => array[Math.floor(Math.random() * array.length)];
