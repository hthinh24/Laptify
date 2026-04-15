package fit.iuh.laptify_backend.order.entity;

import fit.iuh.laptify_backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "user_placement_infos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPlacementInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phoneNumber;
    private String email;
    private String address;
    private boolean isSaved;

    @OneToOne(mappedBy = "userInfoPlacement")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public UserPlacementInfo(String customerName, String phoneNumber, String email, String address, boolean isSaved) {
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.isSaved = isSaved;
    }
}
