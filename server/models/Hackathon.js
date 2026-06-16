import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    memberEmail: {
      type: String,
      required: [true, 'Member email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
  },
  { _id: false }
);

const hackathonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'],
    },
    college: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year of study is required'],
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    },
    domain: {
      type: String,
      required: [true, 'Domain/Track is required'],
      trim: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [5, 'Project name must be at least 5 characters long'],
    },
    pptLink: {
      type: String,
      required: [true, 'PPT link is required'],
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL',
      ],
    },
    prototypeLink: {
      type: String,
      required: [true, 'Prototype link is required'],
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL',
      ],
    },
    demoVideoLink: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL',
      ],
    },
    teamSize: {
      type: Number,
      required: [true, 'Team size is required'],
      min: [1, 'Team size must be at least 1'],
      max: [5, 'Team size cannot exceed 5'],
    },
    teamMembers: {
      type: [teamMemberSchema],
      validate: {
        validator: function (members) {
          // If team size is 1, no team members needed
          if (this.teamSize === 1) {
            return members.length === 0;
          }
          // Otherwise, team members should be teamSize - 1 (excluding team leader)
          return members.length === this.teamSize - 1;
        },
        message: 'Number of team members must match team size',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
hackathonSchema.index({ userId: 1, createdAt: -1 });
hackathonSchema.index({ email: 1 });
hackathonSchema.index({ status: 1 });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon;