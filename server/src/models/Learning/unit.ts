import { Schema, model } from 'mongoose';
import { Unit } from '../../types/learning';

/*
The unit model from our database
*/
const UnitSchema = new Schema<Unit>({
  name: {
    type: 'String',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  content: [{ type: [Schema.Types.Mixed] }],
});

const modelUnit = model<Unit>('Unit', UnitSchema);
export default modelUnit;
