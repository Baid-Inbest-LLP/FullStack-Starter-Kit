import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { resetUserPassword } from "../services/auth.service.js";
import { isLevelRole, isSuperAdmin } from "../constants/roles.js";

const canManageUser = (actorRole, targetRole) =>
	isSuperAdmin(actorRole) && isLevelRole(targetRole);

export const listUsers = asyncHandler(async (req, res) => {
	const users = await User.find()
		.select(
			"name userName role isActive lastLogin createdAt updatedAt",
		)
		.sort({ createdAt: 1 });
	ApiResponse.success(res, users);
});

export const updateUser = asyncHandler(async (req, res) => {
	const actor = req.user;
	const user = await User.findById(req.params.id);
	if (!user) throw ApiError.notFound("User not found");

	const isSelf = user._id.equals(actor._id);
	if (!isSelf && !canManageUser(actor.role, user.role)) {
		throw ApiError.forbidden(
			"You do not have permission to manage this user",
		);
	}

	const { name, userName, isActive, role } = req.body;
	if (name !== undefined) user.name = name;
	if (role !== undefined && role !== user.role) {
		if (!isLevelRole(role) || !isLevelRole(user.role)) {
			throw ApiError.badRequest("Role must be one of L1 to L6");
		}
		user.role = role;
	}
	if (userName !== undefined) {
		const normalized = String(userName).trim().toLowerCase();
		const existing = await User.findOne({
			userName: normalized,
			_id: { $ne: user._id },
		});
		if (existing) throw ApiError.conflict("User name already in use");
		user.userName = normalized;
	}
	if (isActive !== undefined) {
		if (isSelf && !isActive) {
			throw ApiError.forbidden("You cannot deactivate your own account");
		}
		user.isActive = Boolean(isActive);
	}

	await user.save();
	ApiResponse.success(res, user, "User updated");
});

export const deleteUser = asyncHandler(async (req, res) => {
	const actor = req.user;
	const user = await User.findById(req.params.id);
	if (!user) throw ApiError.notFound("User not found");

	if (user._id.equals(actor._id)) {
		throw ApiError.forbidden("You cannot delete your own account");
	}
	if (user.role === "superadmin") {
		throw ApiError.forbidden("Superadmin users cannot be deleted");
	}
	if (!canManageUser(actor.role, user.role)) {
		throw ApiError.forbidden(
			"You do not have permission to delete this user",
		);
	}

	await user.deleteOne();
	ApiResponse.success(res, null, "User deleted");
});

export const resetPassword = asyncHandler(async (req, res) => {
	const newPassword = await resetUserPassword(req.params.id, req.user);
	ApiResponse.success(
		res,
		{ password: newPassword },
		"Password reset successfully",
	);
});
