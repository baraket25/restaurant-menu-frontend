import Modal from './Modal'
import { AlertTriangle } from 'lucide-react'

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title=" " size="sm">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="p-4 bg-red-50 rounded-full">
        <AlertTriangle className="text-red-500" size={28} />
      </div>
      <div>
        <h3 className="font-semibold text-stone-800 text-lg">{title}</h3>
        <p className="text-stone-500 text-sm mt-1">{message}</p>
      </div>
      <div className="flex gap-3 w-full mt-2">
        <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
        <button onClick={onConfirm} disabled={loading} className="btn-danger flex-1">
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </Modal>
)

export default ConfirmDialog
