import mongoose from "mongoose";

// App-wide settings stored as a single document (key: "app").
const appSettingSchema = new mongoose.Schema(
	{
		key: { type: String, required: true, unique: true, default: "app" },
		themeColor: { type: String, trim: true },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

export const AppSetting = mongoose.model("AppSetting", appSettingSchema);
