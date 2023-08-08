package me.zxread.userpass

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter
import com.google.zxing.WriterException
import com.journeyapps.barcodescanner.BarcodeEncoder
import me.zxread.userpass.databinding.ShowProofSegmentBinding


/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class ShowProofFragment : Fragment() {
    private var _binding: ShowProofSegmentBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
    private val proofViewModel: ProofViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = ShowProofSegmentBinding.inflate(inflater, container, false)
        binding.hhWuhanShow.setOnClickListener { showQrProofCode(proofViewModel.proofs[1]) }
        binding.hhDaliShow.setOnClickListener { showQrProofCode(proofViewModel.proofs[2]) }
        return binding.root

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun showQrProofCode(srcData: CharSequence?) {
        val qrImgVIew = binding.proofQrcode
        if (srcData != null) {
            binding.qrContent.text = srcData
            Log.e("USERPASS", "src data = $srcData")

            try {
                val mWriter = MultiFormatWriter()
                //BitMatrix class to encode entered text and set Width & Height
                val mMatrix = mWriter.encode(srcData.toString(), BarcodeFormat.QR_CODE, 400, 400)
                val mEncoder = BarcodeEncoder()
                val mBitmap = mEncoder.createBitmap(mMatrix) //creating bitmap of code
                qrImgVIew.setImageBitmap(mBitmap)
            } catch (e: WriterException) {
                e.printStackTrace()
            }
        } else {
            qrImgVIew.setImageDrawable(null)
        }
    }
}