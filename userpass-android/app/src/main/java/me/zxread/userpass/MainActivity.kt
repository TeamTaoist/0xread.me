package me.zxread.userpass

import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import me.zxread.userpass.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    private val proofViewModel: ProofViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        proofViewModel.allProofs.observe(this) { }

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        val navController = findNavController(R.id.nav_host_fragment_content_main)
        appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)

        var fabVisible = false

        binding.fab.setOnClickListener {
            if (!fabVisible) {
                binding.fabGenProof.show()
                binding.fabShowProof.show()

                binding.fabGenProof.visibility = View.VISIBLE
                binding.fabShowProof.visibility = View.VISIBLE

                fabVisible = true
            } else {
                binding.fabGenProof.hide()
                binding.fabShowProof.hide()

                binding.fabGenProof.visibility = View.GONE
                binding.fabShowProof.visibility = View.GONE

                fabVisible = false
            }
        }

        binding.fabGenProof.setOnClickListener {
            findNavController(R.id.nav_host_fragment_content_main).navigate(R.id.NewProofFragment)
        }

        binding.fabShowProof.setOnClickListener {
            findNavController(R.id.nav_host_fragment_content_main).navigate(R.id.ShowProofFragment)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        return navController.navigateUp(appBarConfiguration)
                || super.onSupportNavigateUp()
    }


}

