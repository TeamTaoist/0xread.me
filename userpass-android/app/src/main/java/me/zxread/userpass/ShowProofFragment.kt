package me.zxread.userpass

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter
import com.google.zxing.WriterException
import com.journeyapps.barcodescanner.BarcodeEncoder
import me.zxread.userpass.databinding.ShowProofSegmentBinding


/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class ShowProofFragment : Fragment() {

    private val testProof = """{
  merkleTreeRoot: '9076089888268829631439887455868636387875659105038680665479355347605907494762',
  nullifierHash: '11145286846512296283835778705381827880322511110104508152926808245589172026593',
  signal: '4242424242',
  externalNullifier: '10354334201938752428558948798274962999644820234654929486063894213598717249307',
  proof: [
    '15586220022347524605422828066863102145420984240881350130042250837844728184341',
    '1075519268395732317500140797111295271979038388197666308794415925147858378357',
    '21388883125285085413096675148848144489176587528130672635081064952341499164660',
    '19500946790002847756100346832580291584755849398811926007741782790269449400578',
    '20780477913554822455144709589885762282846329677176207676941246654981735459015',
    '10024917413483993219357911796402267555798629071020424622341355142694486168934',
    '3842756930501550290460257394367478005397669255100305195918368490549982903245',
    '17857622697499255144472129502814390533566534709850729438436106273130464392626'
  ]
}"""

    private var _binding: ShowProofSegmentBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = ShowProofSegmentBinding.inflate(inflater, container, false)
        binding.hhWuhanShow.setOnClickListener { showQrProofCode(testProof) }
        binding.hhDaliShow.setOnClickListener { showQrProofCode(binding.hhDaliShow.text) }
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun showQrProofCode(srcData: CharSequence) {
        val qrImgVIew = binding.proofQrcode
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
    }

    private fun toggleNfcEmulatorService() {}
}