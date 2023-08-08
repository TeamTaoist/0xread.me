package me.zxread.userpass

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import me.zxread.userpass.databinding.NewProofFragmentBinding

/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class NewProofFragment : Fragment() {
    private var _binding: NewProofFragmentBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
    private val rdmeClient = ZxreadmeClient("https://0xread.me/api")

    private val proofViewModel: ProofViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = NewProofFragmentBinding.inflate(inflater, container, false)
        val reqRsltView = binding.reqResult

        binding.hhWuhanNew.setOnClickListener { rdmeClient.getProof("hhwhhan", 1, proofViewModel, activity, reqRsltView) }
        binding.hhDaliNew.setOnClickListener { rdmeClient.getProof("hhdali", 2, proofViewModel, activity, reqRsltView) }
        binding.hhTaibei.setOnClickListener { rdmeClient.getProof("hhtaibei", 3, proofViewModel, activity, reqRsltView) }

        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}