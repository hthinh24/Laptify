package fit.iuh.laptify_backend.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RefreshToken {
    @Id
    private String  jid;

    @Column(columnDefinition = "TEXT")
    private String token;

    @CreationTimestamp
    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public RefreshToken(String jid, String token, User user) {
        this.jid = jid;
        this.token = token;
        this.user = user;
    }
}
