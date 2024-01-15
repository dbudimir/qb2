import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    bannerText: { type: String },
    bannerUrl: { type: String, unique: true },
    bannerAd: {
      bannerAdVisible: { type: Boolean },
      bannerAdUrl: { type: String, unique: true },
      bannerAdImageUrl: { type: String, unique: true },
    },
    topPosts: {
      post1: { type: { title: String, url: String } },
      post2: { type: { title: String, url: String } },
      post3: { type: { title: String, url: String } },
      post4: { type: { title: String, url: String } },
    },
  },
  {
    timestamps: true,
  }
);

delete mongoose.connection.models.Admin;

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
